import {describe} from "@jest/globals";
import {useNotesVisualizer} from "../../hooks/useNotesVisualizer";
import {renderHook} from "@testing-library/react-hooks";
import {Note} from "../../interfaces";
import {act} from "react-test-renderer";

const NOTE_A_1: Note = {frequency: 444, velocity: 1};
const NOTE_B_05: Note = {frequency: 493.88, velocity: 0.5};

describe("useNotesVisualizer", () => {

    test("should have 0 velocity when there are no notes", () => {
        const {result} = renderHook(() => useNotesVisualizer());

        expect(result.current[2]).toBe(0)
    });

    test("should compute velocity of single note", () => {
        const {result} = renderHook(() => useNotesVisualizer());

        act(() => {
            const startNote = result.current[0];

            startNote(NOTE_A_1);
        });

        expect(result.current[2]).toBe(0.75 * NOTE_A_1.velocity!);
    });

    test("should compute velocity of two notes", () => {
        const {result} = renderHook(() => useNotesVisualizer());

        act(() => {
            const startNote = result.current[0];

            startNote(NOTE_A_1);
            startNote(NOTE_B_05);
        });

        expect(result.current[2]).toBe(0.75 * (NOTE_A_1.velocity! + NOTE_B_05.velocity!));
    });

    test("should compute velocity of single note after removal", () => {
        const {result} = renderHook(() => useNotesVisualizer());

        act(() => {
            const startNote = result.current[0];
            const stopNote = result.current[1];

            startNote(NOTE_A_1);
            startNote(NOTE_B_05);
            stopNote(NOTE_B_05);
        });

        expect(result.current[2]).toBe(0.75 * NOTE_A_1.velocity!);
    });

    test("should only add the same note once", () => {
        const {result} = renderHook(() => useNotesVisualizer());

        act(() => {
            const startNote = result.current[0];

            startNote(NOTE_A_1);
            startNote(NOTE_A_1);
        });

        expect(result.current[2]).toBe(0.75 * NOTE_A_1.velocity!);
    });
});