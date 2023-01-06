import { mount } from "@vue/test-utils";
import App from "@/App.vue";

describe("Counter", () => {
    let wrapper;
    const findButtonByText = (text) => 
        wrapper.findAll("button").wrappers.find((w) => w.text() === text)

    const createComponent = () => {
        wrapper = mount(App)
    }

    afterEach(() => 
        wrapper.destroy()
    )

      it("shows 0 when initialized", () => {
        createComponent()
        expect(wrapper.text()).toContain("0")
      });

      it.each`
        buttonText| change                 | expectedResult
        ${"+"}    | ${"increments by one"} | ${'1'}
        ${"-"}    | ${"decrements by one"} | ${'-1'}
      `("$change when + button clicked", async ({buttonText, change, expectedResult}) => {
        createComponent()
        await findButtonByText(buttonText).trigger("click")
        expect(wrapper.text()).toContain(expectedResult)
      });
      it("shows resrt button when counter is below 0",async () => {
        createComponent()
        // wrapper.vm.counter = -1
        // await wrapper.vm.$nextTick()
        await findButtonByText("-").trigger('click')
        expect(wrapper.text()).toContain('-1')
        expect(findButtonByText("Reset").exists()).toBe(true)
      });
      it("does not shows resrt button when counter is not below 0",async () => {
        createComponent()
        // wrapper.vm.counter = 1
        // await wrapper.vm.$nextTick()
        await findButtonByText("+").trigger('click')
        expect(wrapper.text()).toContain('1')
        expect(findButtonByText("Reset")).toBe(undefined)
      });
    });