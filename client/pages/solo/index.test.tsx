import React from "react";
import {describe} from "@jest/globals";
import {fireEvent, render, screen} from "@testing-library/react";
import SoloPage from "./index";

const mockSynth = jest.fn();
const mockMidiControllers: WebMidi.MIDIInput[] = [];
const mockCallback = jest.fn();
const mockInitializeMidiHanler = jest.fn();

jest.mock("../../hooks/useInstrument", () => ({
    useInstrument: jest.fn().mockImplementation(() => [mockSynth, mockCallback, mockCallback]),
}));
jest.mock("../../hooks/useMidiHandler", () => ({
    useMidiHandler: jest.fn().mockImplementation(() => [mockInitializeMidiHanler, mockCallback, mockMidiControllers]),
}));

describe("SoloPage", () => {

    test("should have start button", () => {
        render(<SoloPage/>);

        expect(screen.getByText("START")).toBeDefined();
    });

    test("should start midi controller when start button clicked", () => {
        render(<SoloPage/>)
        const startButton = screen.getByText("START");

        fireEvent.click(startButton);

        expect(mockInitializeMidiHanler).toHaveBeenCalled();
    });
});