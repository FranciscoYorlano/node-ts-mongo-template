import mongoose, { Document, Schema, Types } from 'mongoose';
import { DocumentResult } from '../../utils/mongo/common';

export interface IComponent extends Document, DocumentResult<IComponent> {
    deleted?: boolean;
}

const ComponentSchema = new Schema<IComponent>(
    {
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const ComponentModel = mongoose.model('collection_component', ComponentSchema);
