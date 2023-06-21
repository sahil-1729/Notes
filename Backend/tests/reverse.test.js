const reverse = require('../utils/for_testing').reverse
test('pallindrom of react',() => {
    const result = reverse('react')
    expect(result).toBe('tkaer')
})
test('reverse of react',() => {
    const result = reverse('react')
    expect(result).toBe('tcaer')
})
test('reverse of relevelar',() => {
    const result = reverse('releveler')
    expect(result).toBe('releveler')
})