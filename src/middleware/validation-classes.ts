import { IsOptional, IsDefined } from 'class-validator';

/* eslint max-classes-per-file: 0 */

export class Get {

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
  _id: string;

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

export class Delete {

}