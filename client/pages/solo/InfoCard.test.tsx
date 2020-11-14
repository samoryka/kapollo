import {describe} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import {InfoCard} from "./InfoCard";
import React from "react";

describe("InfoCard", () => {
    
    test("should hide Controllers section when they're not defined", () => {
        render(<InfoCard started={true} setStarted={jest.fn()} midiControllers={undefined}/>);
        expect(screen.queryByText("MIDI Controllers")).toBeNull();
    });

    test("should display Controllers section when they're defined", () => {
        render(<InfoCard started={false} setStarted={jest.fn()} midiControllers={[]}/>);

        expect(screen.getByText("Instrument")).toBeDefined();
        expect(screen.getByText("MIDI Controllers")).toBeDefined();
    });
});