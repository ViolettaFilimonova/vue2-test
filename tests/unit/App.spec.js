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

    //   it("increments by one when + button clicked", async () => {
    //     createComponent()
    //     await findPlusButton().trigger("click")
    //     expect(wrapper.text()).toContain('1')
    //   });
    });