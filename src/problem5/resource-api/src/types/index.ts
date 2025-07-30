export interface Resource {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateResourceInput {
    name: string;
    description: string;
}

export interface UpdateResourceInput {
    name?: string;
    description?: string;
}