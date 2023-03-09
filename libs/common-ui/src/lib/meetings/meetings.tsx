import { Box } from '@mui/material';
import {
  collection,
  DocumentReference,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../connect/Firebase';
import styles from './meetings.module.scss';

/* eslint-disable-next-line */
export interface MeetingsProps {}

export interface MeetingDocument {
  id: string;
  client?: DocumentReference;
  professionnal?: DocumentReference;
  date?: Timestamp;
  name?: string;
}

export function Meetings(props: MeetingsProps) {
  const [meetings, setMeetings] = useState<MeetingDocument[]>([]);

  const fetchPost = async () => {
    await getDocs(
      query(collection(db, 'meetings'), where('name', '!=', ''))
    ).then((querySnapshot) => {
      const newData: MeetingDocument[] = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMeetings(newData);
      console.log(newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div className={styles['container']}>
      {meetings.map((meeting) => (
        <Box key={meeting.id}>
          <div>{meeting.name}</div>
          <div>{meeting.date?.toDate().toLocaleDateString()}</div>
        </Box>
      ))}
    </div>
  );
}

export default Meetings;
