import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { clean, composeMessage, whatsappHref } from '../lib/whatsapp'
import { WhatsAppBrief } from './WhatsAppBrief'

describe('composeMessage', () => {
  it('arma un saludo mínimo sin datos', () => {
    expect(composeMessage({})).toBe('Hola Alejandro. Quiero hacer una consulta.')
  })

  it('arma el mensaje completo en orden', () => {
    expect(
      composeMessage({
        nombre: 'Carla',
        obra: 'remodelacion',
        situacion: 'casa',
        ubicacion: 'Cariló',
        plazo: 'evaluando',
      }),
    ).toBe(
      'Hola Alejandro, soy Carla. Quiero hacer una consulta por una remodelación en Cariló. ' +
        'Ya tengo la casa. Todavía estoy evaluando opciones, sin apuro.',
    )
  })

  it('"Otra consulta" no agrega frase de obra', () => {
    expect(composeMessage({ obra: 'otra', ubicacion: 'Pinamar' })).toBe(
      'Hola Alejandro. Quiero hacer una consulta en Pinamar.',
    )
  })

  it('ignora valores desconocidos', () => {
    expect(composeMessage({ obra: 'x', plazo: 'y' })).toBe(
      'Hola Alejandro. Quiero hacer una consulta.',
    )
  })

  it('limpia espacios y recorta el texto libre', () => {
    expect(clean('  Ana \n  María  ', 40)).toBe('Ana María')
    expect(clean('a'.repeat(80), 40)).toHaveLength(40)
  })

  it('codifica el mensaje en el link', () => {
    expect(whatsappHref('https://wa.me/549', 'Hola, ¿qué tal?')).toBe(
      'https://wa.me/549?text=Hola%2C%20%C2%BFqu%C3%A9%20tal%3F',
    )
  })
})

describe('WhatsAppBrief', () => {
  it('actualiza el mensaje y el link al completar la ficha', async () => {
    const user = userEvent.setup()
    render(<WhatsAppBrief />)
    await user.type(screen.getByLabelText(/Nombre/), 'Carla')
    await user.click(screen.getByRole('radio', { name: 'Ampliación' }))
    await user.type(screen.getByLabelText(/Ubicación/), 'Cariló')
    await user.click(screen.getByRole('radio', { name: 'Lo antes posible' }))

    const expected =
      'Hola Alejandro, soy Carla. Quiero hacer una consulta por una ampliación en Cariló. ' +
      'Me gustaría empezar lo antes posible.'
    expect(screen.getByText(expected)).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /Enviar por WhatsApp/ })
    expect(link).toHaveAttribute('href', expect.stringContaining('wa.me/5492235045893?text='))
    expect(decodeURIComponent(link.getAttribute('href')!.split('text=')[1])).toBe(expected)
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('el resumen muestra lo elegido o "Por definir"', async () => {
    const user = userEvent.setup()
    render(<WhatsAppBrief />)
    expect(screen.getAllByText('Por definir')).toHaveLength(3)
    await user.click(screen.getByRole('radio', { name: 'Casa nueva' }))
    expect(screen.getAllByText('Por definir')).toHaveLength(2)
  })

  it('las opciones son radios agrupados y navegables con teclado', async () => {
    const user = userEvent.setup()
    render(<WhatsAppBrief />)
    const group = screen.getByRole('group', { name: /¿Qué querés hacer\?/ })
    expect(group).toBeInTheDocument()
    const first = screen.getByRole('radio', { name: 'Casa nueva' })
    await user.click(first)
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('radio', { name: 'Remodelación' })).toBeChecked()
  })
})
