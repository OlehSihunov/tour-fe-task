import ITour from './ITour';

interface ITourStore extends ITour {
  personCount: number,
  userId: string
}

export default ITourStore;
