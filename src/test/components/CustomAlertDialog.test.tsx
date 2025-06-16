import {beforeEach, describe, expect, it, vi} from "vitest";
import {CustomAlertDialog} from "@/components/CustomAlertDialog";
import {render} from "@testing-library/react";


describe('CustomAlertDialog', () => {
    let onConfirmAction: () => Promise<void>;

    beforeEach(() => {
        onConfirmAction = vi.fn();
    })

    it('should render all texts', () => {
        const wrapper = render(
            <CustomAlertDialog
                buttonTriggerText="Action"
                dialogTitle="Are you testing?"
                dialogDescription="It's like you are testing it."
                onConfirmAction={onConfirmAction} />
        )

        expect(wrapper.findByText("Are you testing?")).toBeTruthy();
        expect(wrapper.findByText("Action")).toBeTruthy();
        expect(wrapper.findByText("It's like you are testing it.")).toBeTruthy();
    });



});