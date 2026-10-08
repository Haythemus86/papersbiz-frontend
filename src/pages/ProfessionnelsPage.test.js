// @vitest-environment jsdom

import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ProfessionnelsPage from './ProfessionnelsPage.vue'

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ProfessionnelsPage', () => {
  it('ne propose plus le service Conseil en négoce', () => {
    globalThis.IntersectionObserver = class {
      observe() {}
      disconnect() {}
    }

    const wrapper = mount(ProfessionnelsPage)

    expect(wrapper.text()).not.toContain('Conseil en négoce')
    expect(wrapper.findAll('a[href="/professionnels/conseil-negoce"]')).toHaveLength(0)
    expect(wrapper.text()).toContain("Création d'entreprise")
    expect(wrapper.text()).toContain("Apport d'affaires")
  })
})
