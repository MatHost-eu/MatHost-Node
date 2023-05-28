export interface File {
  name: string;
  mode: string;
  size: number;
  is_file: boolean;
  is_symlink: boolean;
  is_editable: boolean;
  mimetype: string;
  created_at: string;
  modified_at: string;
}

export interface APIFile {
  object: 'file_object';
  attributes: File;
}

export interface APIFileList {
  object: string;
  data: APIFile[];
}
