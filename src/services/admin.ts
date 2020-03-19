import { getConnection } from "typeorm";
import { getRepository } from "typeorm";
import { Events } from "../entity/Events";

interface BodyType {
  eventTitle: string;
  startDate: string;
  endDate: string;
  detailPageUrl: string;
  buttonUrl: string;
  buttonImage: string;
  bannerImage: string;
  pageImage: string;
}

export default class AdminService {
  async addEventService(data: BodyType): Promise<object> {
    const indata = await getRepository(Events).findOne({
      where: [
        {
          detailPageUrl: data.detailPageUrl
        },
        { buttonUrl: data.buttonUrl }
      ]
    });
    if (indata) {
      if (indata.detailPageUrl === data.detailPageUrl) {
        return { key: "detailPageUrl" };
      } else if (indata.buttonUrl === data.buttonUrl) {
        return { key: "buttonUrl" };
      }
    }
    const events = new Events();
    const forInsertData = {
      ...events,
      ...data,
      detailPageUrl: data.detailPageUrl ? data.detailPageUrl : null,
      buttonUrl: data.buttonUrl ? data.buttonUrl : null
    };
    await getRepository(Events).save(forInsertData);
    return { key: "completed" };
  }

  async putEventService(data: BodyType, id: string): Promise<void> {
    const result = await getRepository(Events).findOne({
      where: {
        id
      }
    });
    const updatedResult = {
      ...result,
      ...data,
      buttonImage: data.buttonImage ? data.buttonImage : result.buttonImage,
      bannerImage: data.bannerImage ? data.bannerImage : result.bannerImage,
      pageImage: data.pageImage ? data.pageImage : result.pageImage
    };
    await getRepository(Events).save(updatedResult);
  }

  async getEventListService(): Promise<object> {
    const result = await getRepository(Events).find({
      select: [
        "id",
        "eventTitle",
        "startDate",
        "endDate",
        "detailPageUrl",
        "bannerImage"
      ],
      where: {
        isDeleted: false
      }
    });
    return result;
  }

  async getEventEntryService(id: string): Promise<object> {
    const result = await getRepository(Events).findOne({
      where: {
        id,
        isDeleted: false
      }
    });
    return result;
  }

  async deleteEventService(id: string): Promise<void> {
    const result = await getRepository(Events).findOne({
      where: {
        id
      }
    });
    result.isDeleted = true;
    await getRepository(Events).save(result);
  }
}
