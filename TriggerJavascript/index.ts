// Import necessary types from PCF framework
import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class TriggerJavascript implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    // Reference to the container element
    private _container: HTMLDivElement;

    /**
     * Constructor for the control
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}

    /**
     * Initialize the control
     * @param context - The context object containing inputs and outputs
     * @param notifyOutputChanged - Callback to notify changes in outputs
     * @param state - Initial state of the control
     * @param container - The container element where the control will be rendered
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this._container = container;
    }

    /**
     * Update the view of the control
     * @param context - The context object containing inputs and outputs
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Clear the container before rendering
        this._container.innerHTML = "";

        // Retrieve input properties
        const buttonLabel = context.parameters.buttonLabel.raw || "Click Me";
        const onClickScript = context.parameters.onClickScript.raw || "";
        const iconUrl = context.parameters.iconUrl?.raw;

        // Create a button element
        const button = document.createElement("button");
        button.innerText = buttonLabel;

        // Add an icon if the icon URL is provided
        if (iconUrl) {
            const icon = document.createElement("img");
            icon.src = iconUrl; // Use the passed URL for the icon
            icon.style.width = "16px"; // Adjust size as needed
            icon.style.height = "16px";
            icon.style.marginRight = "8px"; // Add spacing between icon and text

            // Handle invalid icons (optional)
            icon.onerror = () => {
                console.error("Invalid icon URL:", iconUrl);
                icon.remove(); // Remove the icon if it fails to load
            };

            button.prepend(icon); // Place the icon before the text
        }

        // Add click event to execute the script
        button.addEventListener("click", () => {
            try {
                eval(onClickScript);
            } catch (error) {
                console.error("Error executing onClickScript:", error);
            }
        });

        // Append the button to the container
        this._container.appendChild(button);
    }

    /**
     * Get the outputs of the control
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Destroy the control
     */
    public destroy(): void {
        this._container.innerHTML = "";
    }
}
