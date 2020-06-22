import { mount } from "@vue/test-utils";
import { expect } from "chai";
import Register from "@/components/Register.vue"

describe('Register.vue', () => {
  // Given/Arrage (Dado que existe...)
  const wrapper = mount(Register)
  let checkbox = wrapper.find('input[type="checkbox"]')
  let registerBtn = wrapper.find('button[type="submit"]')

  it('has a disabled button', () => {
    // When/Act (Cuando pasa cierta cosa evento)
    checkbox.setChecked(false)
    // Then/Assert (Entonces, pasa cierta cosa o algo)
    expect(registerBtn.classes('is-disabled')).to.be.true
  })
  it('has a button not disabled when checkbox is checked', () => {
    checkbox.setChecked(true)
    expect(registerBtn.classes('is-disabled')).to.be.false
  })
  it('register a user', () => {
    // 0- Cargar componente con los métodos de prueba
    let isSent = false
    const stubMethod = () => { isSent= true }
    const wrapper = mount(Register, {
        methods: {
            submitForm: stubMethod
        } 
    })
    // 1- Encontrar los campos necesarios
    let userName = wrapper.find('input[type="text"]')
    let email = wrapper.find('input[type="email"]')
    let password = wrapper.find('input[type="password"]')
    let registerBtn = wrapper.find('button[type="submit"]')
    
    // 2- Asignar los valores a los campos 
    userName.setValue('Baltazar Bratt')
    email.setValue('bbratt@gmail.com')
    password.setValue('danceFight')

    // 3- Enviar formulario
    registerBtn.trigger('click')

    // 4- Probar que se envió el registro
    expect(isSent).to.be.true
  })
}) 