import { Category, CategoryProperties } from './category'
import { omit } from 'lodash'
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id-vo'

describe('Category Unit Tests', () => {
  test('constructor of category', () => {
    let category = new Category({ name: 'Movies' })
    let props = omit(category.props, 'created_at')
    expect(props).toStrictEqual({
      //the object needs match each property
      name: 'Movies',
      description: null,
      is_active: true,
    })
    expect(category.props.created_at).toBeInstanceOf(Date)
    category = new Category({
      name: 'Series',
      description: 'Some description',
      is_active: false,
    })
    expect(category.props).toMatchObject({
      //don't validates each property
      name: 'Series',
      description: 'Some description',
      is_active: false,
    })
    category = new Category({
      name: 'Other',
      description: 'Other description',
    })
    expect(category.props).toMatchObject({
      name: 'Other',
      description: 'Other description',
      is_active: true,
    })
    category = new Category({
      name: 'Cartoon',
      is_active: true,
    })
    expect(category.props).toMatchObject({
      name: 'Cartoon',
      description: null,
      is_active: true,
    })
  })

  test('getter of name prop', () => {
    const category = new Category({ name: 'Movies' })
    expect(category.name).toBe('Movies')
  })

  test('getter of created_at prop', () => {
    let category = new Category({ name: 'Movies' })
    expect(category.created_at).toBeInstanceOf(Date)
    let created_at = new Date('2010-01-01')
    category = new Category({ name: 'Movies', created_at })
    expect(category.created_at).toBe(created_at)
  })

  test('id field', () => {
    type CategoryData = { props: CategoryProperties; id?: string }
    const data: CategoryData[] = [
      { props: { name: 'Serie' } },
      { props: { name: 'Serie' }, id: null },
      { props: { name: 'Serie' }, id: undefined },
      { props: { name: 'Serie' }, id: '1a629f6b-be72-4185-aeb2-e09c6f0eb147' },
    ]
    data.forEach((item) => {
      let category = new Category(item.props, item.id)
      expect(category.id).toBeInstanceOf(UniqueEntityId)
      if (item.id) {
        expect(category.id.id).toBe('1a629f6b-be72-4185-aeb2-e09c6f0eb147')
      }
    })
  })

  test('getter and setter of description prop', () => {
    let category = new Category({ name: 'Movies' })
    expect(category.description).toBeNull()
    category = new Category({
      name: 'Movies',
      description: 'Some description.',
    })
    expect(category.description).toBe('Some description.')
    category = new Category({ name: 'Movies' })
    category['description'] = 'Other description.'
    expect(category.description).toBe('Other description.')
    category['description'] = undefined
    expect(category.description).toBeNull()
  })

  test('getter and setter of is_active prop', () => {
    let category = new Category({ name: 'Movies' })
    expect(category.is_active).toBeTruthy()
    category = new Category({ name: 'Movies', is_active: true })
    expect(category.is_active).toBeTruthy()
    category['is_active'] = false
    expect(category.is_active).toBeFalsy()
    category = new Category({ name: 'Movies', is_active: false })
    expect(category.is_active).toBeFalsy()
  })
})
