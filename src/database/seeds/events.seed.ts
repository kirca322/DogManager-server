import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Events } from "../entity/Events";

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const eventData = [
      {
        eventTitle: `new event 1`,
        startDate: "202003161105",
        endDate: "202004012359",
        detailPageUrl: `/detail1`,
        buttonImage: "button image",
        bannerImage: "banner image",
        pageImage: "page image",
        couponCode: "@first"
      },
      {
        eventTitle: `new event 2`,
        startDate: "202003161105",
        endDate: "202004012359",
        detailPageUrl: `/detail2`,
        buttonImage: "button image",
        bannerImage: "banner image",
        pageImage: "page image",
        couponCode: "@second"
      },
      {
        eventTitle: `new event 3`,
        startDate: "202003161105",
        endDate: "202004012359",
        detailPageUrl: `/detail3`,
        buttonImage: "button image",
        bannerImage: "banner image",
        pageImage: "page image",
        couponCode: "@third"
      }
    ];
    await connection.getRepository(Events).save(eventData);
  }
}