import { faker } from '@faker-js/faker'

export type Book = {
  sku: string;
  authorName: string;
  description: string;
  isbn: string;
  name: string;
  publishDate: string;
  edition: string;
  publisher: string;
  picture: string;
  language: string;
  borrowingDateLimit: string;
  status: string;
  library: string;
};

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Book => {
  return {
    sku: faker.commerce.isbn(),
    authorName: faker.person.fullName(),
    description: faker.lorem.text(),
    isbn: faker.commerce.isbn(),
    name: faker.music.songName(),
    publishDate: faker.date.anytime().toString(),
    edition: "string",
    publisher: "string",
    picture: faker.image.url(),
    language: "vn",
    borrowingDateLimit: "5 ngày",
    status: "Trên kệ",
    library: "Cầu Giấy"
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Book[] => {
    const len = lens[depth]!;
    return range(len).map((d): Book => {
      return newPerson();
    });
  };

  return makeDataLevel();
}
