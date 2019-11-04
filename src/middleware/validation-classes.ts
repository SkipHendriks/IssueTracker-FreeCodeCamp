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

}

export class Delete {

}