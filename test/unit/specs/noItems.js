import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils"
import NoItems from "../../../components/NoItems.vue"

const localVue = createLocalVue()

const url = 'http://localost:3000'
const urlWithCatQueryKey = 'http://localhost:3000/?category=IT'
const urlWithDateQueryKey = 'http://localhost:3000/?date=Last%2024'
const urlWithSearchQueryKey = 'http://localhost:3000/?search=hulapalu'

function getUrl(queryKey) {
    switch(queryKey) {
        case 'category':
            return urlWithCatQueryKey
        case 'date':
            return urlWithDateQueryKey
        case 'search':
            return urlWithSearchQueryKey
        default:
            return url
    }
}

const factory = (queryKey) => {
    return mount(NoItems, {
        propsData: {
            baseUrl: getUrl(queryKey)
        }
    })
}

test('no items without any query key given', () => {    
    const wrapper = shallowMount(NoItems, {
        localVue,
        propsData: {
            baseUrl: url
        },
        stubs: {
            NuxtLink: RouterLinkStub
        }
    })

    // check componet name
    expect(wrapper.name()).toBe('no-items')

    // no items text
    expect(wrapper.contains('#no-items')).toBeTruthy()

})

test('no items with category query key given', () => {    
    const wrapper = shallowMount(NoItems, {
        localVue,
        propsData: {
            baseUrl: urlWithCatQueryKey
        },
        stubs: {
            NuxtLink: RouterLinkStub
        }
    })

    // check props
    expect(wrapper.vm.baseUrl).toBe(urlWithCatQueryKey)

    // check category input data
    expect(wrapper.vm.categoryInput).toBe('IT')

})

test('no items with date query key', () => {    
    const wrapper = shallowMount(NoItems, {
        localVue,
        propsData: {
            baseUrl: urlWithDateQueryKey
        },
        stubs: {
            NuxtLink: RouterLinkStub
        }
    })

    // check props
    expect(wrapper.vm.baseUrl).toBe(urlWithDateQueryKey)

    // check date input 
    expect(wrapper.vm.dateInput).toBe('Last 24')

})

test('no items with search query key', () => {    
    const wrapper = shallowMount(NoItems, {
        localVue,
        propsData: {
            baseUrl: urlWithSearchQueryKey
        },
        stubs: {
            NuxtLink: RouterLinkStub
        }
    })

    // check props
    expect(wrapper.vm.baseUrl).toBe(urlWithSearchQueryKey)

    // check search input data 
    expect(wrapper.vm.searchInput).toBe('hulapalu')

})