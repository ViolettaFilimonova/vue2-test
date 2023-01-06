 import { mount } from "@vue/test-utils";
 import { nextTick } from "vue";
import App from "@/App.vue";

describe("Counter", () => {
    let wrapper;
    const findPlusButton = () => 
        wrapper.findAll("button").wrappers.find((w) => w.text() === "+")

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

      it("increments by one when + button clicked", async () => {
        createComponent()
        findPlusButton().trigger("click")
        await nextTick()
        expect(wrapper.text()).toContain('1')
      });
    });