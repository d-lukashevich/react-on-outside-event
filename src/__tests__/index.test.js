import * as reactOnOutsideEvent from '../index';
import reactOnOutsideEventDefault from '../index';

describe('index', () => {
    it('Named export should contain "useOutsideEvent"', () => {
        expect(Boolean(reactOnOutsideEvent['useOutsideEvent']));
    });
    it('Named export should contain "OutsideEventContainer"', () => {
        expect(Boolean(reactOnOutsideEvent['OutsideEventContainer']));
    });
    it('Default export should contain "useOutsideEvent"', () => {
        expect(Boolean(reactOnOutsideEventDefault['useOutsideEvent']));
    });
    it('Default export should contain "OutsideEventContainer"', () => {
        expect(Boolean(reactOnOutsideEventDefault['OutsideEventContainer']));
    });
});
