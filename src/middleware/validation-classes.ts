import { IsOptional, IsDefined } from 'class-validator';
import { Schema } from 'mongoose';

import ObjectId = Schema.Types.ObjectId;

/* eslint max-classes-per-file: 0 */

export class Get {
  @IsOptional()
  issue_title: string;

  @IsOptional()
  issue_text: string;

  @IsOptional()
  created_by: string;

  @IsOptional()
  assigned_to: string;

  @IsOptional()
  status_text: string;

  @IsOptional()
  open: boolean;

  @IsOptional()
  updated_on: Date;
}

export class Post {
  @IsDefined()
  issue_title: string;

  @IsDefined()
  issue_text: string;

  @IsDefined()
  created_by: string;

  @IsOptional()
  assigned_to: string;

  @IsOptional()
  status_text: string;
}

export class Put {
  @IsDefined()
  _id: ObjectId;

  @IsOptional()
  issue_title: string;

  @IsOptional()
  issue_text: string;

  @IsOptional()
  created_by: string;

  @IsOptional()
  assigned_to: string;

  @IsOptional()
  status_text: string;

  @IsOptional()
  open: boolean;
}

// not used because of specific error requirements in the specs
export class Delete {
  @IsDefined()
  _id: ObjectId;
}

export class GetProjects {
  @IsOptional()
  limit: number;
}
