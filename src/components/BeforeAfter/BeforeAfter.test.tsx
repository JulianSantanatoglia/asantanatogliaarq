import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { BeforeAfter, type BeforeAfterProps } from './BeforeAfter'

const pair: Pick<BeforeAfterProps, 'before' | 'after' | 'label'> = {
  label: 'Fachada',
  before: {
    src: '/antes.jpg',
    alt: 'Fachada antes de la remodelación: volumen blanco sobre pilotes',
    width: 1600,
    height: 1000,
  },
  after: {
    src: '/despues.jpg',
    alt: 'Fachada después: volumen gris con galería y pileta',
    width: 1600,
    height: 1000,
  },
}

function setup(props: Partial<BeforeAfterProps> = {}) {
  const user = userEvent.setup()
  const utils = render(<BeforeAfter {...pair} {...props} />)
  const slider = screen.getByRole('slider', { name: 'Comparar antes y después: Fachada' })
  return { user, slider, ...utils }
}

describe('BeforeAfter', () => {
  it('expone un slider accesible con el estado inicial', () => {
    const { slider } = setup()
    expect(slider).toHaveAttribute('aria-valuemin', '0')
    expect(slider).toHaveAttribute('aria-valuemax', '100')
    expect(slider).toHaveAttribute('aria-valuenow', '50')
    expect(slider).toHaveAttribute('aria-valuetext', '50% antes, 50% después')
  })

  it('muestra las dos imágenes con su alt', () => {
    setup()
    expect(screen.getByAltText(pair.before.alt)).toHaveAttribute('width', '1600')
    expect(screen.getByAltText(pair.after.alt)).toHaveAttribute('height', '1000')
  })

  it('las flechas mueven 2 % y con Shift 10 %', async () => {
    const { user, slider } = setup()
    slider.focus()
    await user.keyboard('{ArrowRight}')
    expect(slider).toHaveAttribute('aria-valuenow', '52')
    await user.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(slider).toHaveAttribute('aria-valuenow', '48')
    await user.keyboard('{Shift>}{ArrowRight}{/Shift}')
    expect(slider).toHaveAttribute('aria-valuenow', '58')
    await user.keyboard('{Shift>}{ArrowLeft}{ArrowLeft}{/Shift}')
    expect(slider).toHaveAttribute('aria-valuenow', '38')
  })

  it('Inicio y Fin van a 0 y 100, y aria-valuetext acompaña', async () => {
    const { user, slider } = setup()
    slider.focus()
    await user.keyboard('{Home}')
    expect(slider).toHaveAttribute('aria-valuenow', '0')
    expect(slider).toHaveAttribute('aria-valuetext', '0% antes, 100% después')
    await user.keyboard('{End}')
    expect(slider).toHaveAttribute('aria-valuenow', '100')
    expect(slider).toHaveAttribute('aria-valuetext', '100% antes, 0% después')
  })

  it('no sale del rango 0–100', async () => {
    const { user, slider } = setup({ initial: 96 })
    slider.focus()
    await user.keyboard('{Shift>}{ArrowRight}{/Shift}')
    expect(slider).toHaveAttribute('aria-valuenow', '100')
    await user.keyboard('{ArrowRight}')
    expect(slider).toHaveAttribute('aria-valuenow', '100')
    await user.keyboard('{Home}{ArrowLeft}{Shift>}{ArrowLeft}{/Shift}')
    expect(slider).toHaveAttribute('aria-valuenow', '0')
  })

  it('acota el valor inicial', () => {
    const { slider } = setup({ initial: 140 })
    expect(slider).toHaveAttribute('aria-valuenow', '100')
  })

  it('escribe la posición como custom property del visor', async () => {
    const { user, slider, container } = setup({ initial: 30 })
    const stage = container.querySelector<HTMLElement>('.ba__stage')
    expect(stage?.style.getPropertyValue('--pos')).toBe('30%')
    slider.focus()
    await user.keyboard('{ArrowRight}')
    expect(stage?.style.getPropertyValue('--pos')).toBe('32%')
  })

  it('avisa la primera interacción una sola vez', async () => {
    const onInteract = vi.fn()
    const { user, slider } = setup({ onInteract })
    slider.focus()
    await user.keyboard('{ArrowRight}{ArrowRight}{End}')
    expect(onInteract).toHaveBeenCalledTimes(1)
  })

  it('ignora teclas que no son de navegación', async () => {
    const { user, slider } = setup()
    slider.focus()
    await user.keyboard('a{Enter}')
    expect(slider).toHaveAttribute('aria-valuenow', '50')
  })

  it('usa etiquetas personalizadas en aria-valuetext', () => {
    const { slider } = setup({ labels: { before: 'Plano', after: 'Obra' } })
    expect(slider).toHaveAttribute('aria-valuetext', '50% plano, 50% obra')
    expect(screen.getByText('Plano')).toBeInTheDocument()
  })
})
