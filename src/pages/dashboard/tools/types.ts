import { Members } from '../groups/components/types';

export enum LockTypes {
  BEZO_LOCK = 'Bezo Lock',
  BEZO_FLEX = 'Bezo Flex',
}

export interface PendingInvites {
  _id: string;
  group_id: string;
  user_id: string;
  admin_id: string;
  status: string;
  createdAt: string;
  group: {
    _id: string;
    groupName: string;
    ref_id: string;
    status: string;
    description: string;
  };
  members: Members[];
}
