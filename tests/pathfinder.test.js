const { findPath } = require('../src/pathfinder');

test('PAN', () => {
  expect(findPath('PAN')).toEqual(['USA', 'MEX', 'GTM', 'HND', 'NIC', 'CRI', 'PAN']);
});
test('BLZ', () => {
  expect(findPath('BLZ')).toEqual(['USA', 'MEX', 'BLZ']);
});
test('CAN', () => {
  expect(findPath('CAN')).toEqual(['USA', 'CAN']);
});
test('USA returns itself', () => {
  expect(findPath('USA')).toEqual(['USA']);
});
test('SLV', () => {
  expect(findPath('SLV')).toEqual(['USA', 'MEX', 'GTM', 'SLV']);
});
test('unknown country returns null', () => {
  expect(findPath('FRA')).toBeNull();
});