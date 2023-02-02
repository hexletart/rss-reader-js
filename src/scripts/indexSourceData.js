import { uniqueId } from 'lodash';

export default (dataCollection) => dataCollection.map((el) => ({ ...el, id: uniqueId() }));
