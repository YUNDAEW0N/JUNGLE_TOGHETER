import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { format } from 'date-fns';

import * as CALENDAR from '@services/calendarAPI';
import useUpdateModalStyle from '@hooks/useUpdateModalStyle';

import { reqGroupEvent } from '@type/index';
import { useSelectedCalendarStore } from '@store/index';

import '@styles/modalStyle.css';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDay: Date | null;
  position: { x: number; y: number };
}

export default React.memo(function EventModal({
  isOpen,
  onClose,
  selectedDay,
  position,
}: EventModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const [modalStyle, setModalStyle] = useState<React.CSSProperties>({});
  const { selectedCalendar } = useSelectedCalendarStore();

  useUpdateModalStyle({ position, setModalStyle });

  const submitNewEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = titleRef.current?.value.trim();

    if (!title) return alert('일정 제목이 비어있습니다.');
    if (!selectedDay) return alert('선택된 날이 없습니다.');
    if (selectedCalendar === 'All') return alert('일정을 등록할 그룹 캘린더를 선택해주세요.');

    const eventData: reqGroupEvent = {
      groupCalendarId: selectedCalendar.calendarId,
      title: title,
      startAt: format(selectedDay, 'yyyy-MM-dd'),
      endAt: format(selectedDay, 'yyyy-MM-dd'),
      members: null,
      color: null,
    };

    const res = await CALENDAR.createGroupEvent(eventData);
    if (res) {
      await CALENDAR.getGroupAllEvents(selectedCalendar.calendarId);
    }
    onClose();
  };

  return (
    <Modal
      className="eventModal"
      overlayClassName="evevntOverlay"
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{ content: { ...modalStyle } }}
    >
      <form onSubmit={submitNewEvent} className="w-full px-3 flex justify-between items-center">
        <input
          className="INPUT w-5/6 p-1 mr-3 border rounded"
          type="text"
          placeholder="일정 제목"
          ref={titleRef}
        />
        <button className="h-fit text-lg hover:text-custom-main" type="submit">
          등록
        </button>
      </form>
    </Modal>
  );
});
