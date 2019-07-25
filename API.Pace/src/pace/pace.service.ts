import { Injectable } from '@nestjs/common';
import { PaceAverage } from 'src/shared/dtos/pace-average.dto';
import { PaceDto } from 'src/shared/dtos/pace.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, DocumentQuery } from 'mongoose';

@Injectable()
export class PaceService {
    constructor(@InjectModel('Pace') private readonly paceModel: Model<PaceDto>) { }

    getAll(): Promise<Partial<PaceDto>[]> {
        return this._getAllPaces();
    }

    create(pace: PaceDto): Promise<PaceDto> {
        const newPace = new this.paceModel(pace);
        return newPace.save();
    }

    delete(id: string): Promise<{ _id: string }> {
        return this.paceModel.deleteOne({ _id: id }).then(() => ({ _id: id }));
    }

    async getAveragePaceGraph(): Promise<PaceAverage[]> {
        const allPaces = await this._getAllPaces();

        return allPaces.map((pace, index) => ({
            mile: pace.currentMile,
            averagePace: (pace.mileTime + allPaces
                .filter((p, i) => i < index)
                .reduce((ac, re) => ac + re.mileTime, 0)) / (index + 1)
        }));
    }

    private _getAllPaces(): Promise<Partial<PaceDto>[]> {
        return this.paceModel
            .find({ mileTime: { $gt: 0 } }, null, { sort: { currentMile: 1 } })
            .then(paces => paces.map(pace => ({
                _id: pace._id,
                currentMile: pace.currentMile,
                mileTime: pace.mileTime,
            })))
    }
}
