import { $ } from './Doe'
import { JSDOM } from 'jsdom'

let DOM
let doc : HTMLElement

beforeAll(() => {
  DOM = new JSDOM(`
  <!DOCTYPE html>
  <p>Hello world
    <span>span</span>
    <span>span1</span>
  </p>
`)
  doc = DOM.window.document.documentElement
})

describe('elements', () => {
  test('$().elements returns array of HTMLElements', () => {
    const result = $('p', doc).elements[0]
    const expected = doc.querySelectorAll('p')[0]

    expect(result).toBe(expected)
  })
})

describe('find', () => {
  test('$().find returns dom collection', () => {
    const result = $('p', doc).find('span')[0]
    const expected = doc.querySelectorAll('p')[0].querySelector('span')

    expect(result).toBe(expected)
  })
})

describe('first', () => {
  test('$().first returns first HTMLElement from collection', () => {
    const result = $('span', doc).first()
    const expected = doc.querySelectorAll('span')[0]

    expect(result).toBe(expected)
  })
})

describe('contains', () => {
  test('$().contains returns true', () => {
    const span = doc.querySelectorAll('p')[0].querySelector('span')
    const result = $('p', doc).contains(span)
    const expected = true

    expect(result).toBe(expected)
  })
  test('$().contains returns false', () => {
    const span = doc.querySelector('p')
    const result = $('p', doc).contains(span)
    const expected = false

    expect(result).toBe(expected)
  })
})

describe('css', () => {
  // test('$().css', () => {
  //   const css = 'background-color:red;color:black;'
  //   const span = doc.querySelector('span').css(css)
  //   const result = $('span', doc).
  //   const expected =
  //
  //   expect(result).toBe(expected)
  // })
  test('$().contains returns false', () => {
    const span = doc.querySelector('p')
    const result = $('p', doc).contains(span)
    const expected = false

    expect(result).toBe(expected)
  })
})
