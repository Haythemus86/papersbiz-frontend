// @vitest-environment jsdom

import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import CreationEntrepriseForm from './CreationEntrepriseForm.vue'
import { submitRequest } from '../../services/api.js'

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

vi.mock('../../services/api.js', () => ({
  submitRequest: vi.fn(),
}))

const fiscalRegimeByLegalForm = {
  SARL: 'IS — Impôt sur les sociétés',
  EURL: 'IR — Impôt sur le revenu',
  SAS: 'IS — Impôt sur les sociétés',
  SASU: 'IS — Impôt sur les sociétés',
  SA: 'IS — Impôt sur les sociétés',
  SCI: 'IR — Impôt sur le revenu',
  'Micro-entreprise': 'Micro-fiscal',
  'Entreprise individuelle': 'IR — Impôt sur le revenu',
}

function mountForm() {
  return mount(CreationEntrepriseForm)
}

async function fillRequiredFields(wrapper) {
  await wrapper.get('select[name="civilite"]').setValue('M.')
  await wrapper.get('input[name="nom"]').setValue('Dupont')
  await wrapper.get('input[name="prenom"]').setValue('Jean')
  await wrapper.get('input[name="email"]').setValue('jean.dupont@example.com')
  await wrapper.get('input[name="telephone"]').setValue('0601020304')
  await wrapper.get('input[name="nomEntreprise"]').setValue('Dupont Conseil')
  await wrapper.get('select[name="secteurActivite"]').setValue('Conseil')
  await wrapper.get('textarea[name="descriptionActivite"]').setValue('Conseil aux entreprises')
  await wrapper.get('input[name="nomPere"]').setValue('Dupont')
  await wrapper.get('input[name="prenomPere"]').setValue('Pierre')
  await wrapper.get('input[name="nomNaissanceMere"]').setValue('Martin')
  await wrapper.get('input[name="prenomMere"]').setValue('Marie')
  await wrapper.get('input[name="consentement"]').setValue(true)
}

describe('CreationEntrepriseForm', () => {
  beforeEach(() => {
    submitRequest.mockResolvedValue({})
    window.scrollTo = vi.fn()
  })

  it('affiche les informations de filiation et l’affiliation du gérant', () => {
    const wrapper = mountForm()

    expect(wrapper.get('.affiliation-box').text()).toContain('Affiliation du gérant')
    expect(wrapper.get('.affiliation-box').text()).toContain('Le nom de naissance de la mère correspond à son nom de jeune fille.')
    expect(wrapper.get('input[name="nomPere"]').attributes('required')).toBeDefined()
    expect(wrapper.get('input[name="prenomPere"]').attributes('required')).toBeDefined()
    expect(wrapper.get('input[name="nomNaissanceMere"]').attributes('required')).toBeDefined()
    expect(wrapper.get('input[name="prenomMere"]').attributes('required')).toBeDefined()
  })

  it('supprime la domiciliation, le régime social et la partie prestations', () => {
    const wrapper = mountForm()
    const text = wrapper.text()

    expect(text).not.toContain('Type de domiciliation')
    expect(text).not.toContain('Régime social du dirigeant')
    expect(text).not.toContain('Prestations souhaitées')
    expect(text).not.toContain('Domiciliation commerciale')
  })

  it.each(Object.entries(fiscalRegimeByLegalForm))(
    'préselectionne %s avec le régime fiscal %s',
    async (legalForm, expectedFiscalRegime) => {
      const wrapper = mountForm()

      await wrapper.get('select[name="formeJuridique"]').setValue(legalForm)

      expect(wrapper.get('select[name="regimeFiscal"]').element.value).toBe(expectedFiscalRegime)
    },
  )

  it('envoie la filiation et l’affiliation sans les champs supprimés', async () => {
    const wrapper = mountForm()
    await fillRequiredFields(wrapper)
    await wrapper.get('select[name="formeJuridique"]').setValue('SASU')
    await wrapper.get('form').trigger('submit')

    expect(submitRequest).toHaveBeenCalledWith('CREATION_ENTREPRISE', expect.any(Object))
    const submittedData = submitRequest.mock.calls[0][1]

    expect(submittedData).toMatchObject({
      affiliationGerant: {
        nomPere: 'Dupont',
        prenomPere: 'Pierre',
        nomNaissanceMere: 'Martin',
        prenomMere: 'Marie',
      },
      regimeFiscal: 'IS — Impôt sur les sociétés',
    })
    expect(submittedData).not.toHaveProperty('domiciliationSouhaitee')
    expect(submittedData).not.toHaveProperty('regimeSocialDirigeant')
    expect(submittedData).not.toHaveProperty('prestations')
  })
})
