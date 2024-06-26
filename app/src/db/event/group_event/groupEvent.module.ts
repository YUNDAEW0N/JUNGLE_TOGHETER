import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEvent } from './entities/groupEvent.entity';
import { GroupEventService } from './groupEvent.service';
import { Calendar } from 'src/calendar/entities/calendar.entity';
import { User } from 'src/db/user/entities/user.entity';
import { UserCalendar } from 'src/db/user_calendar/entities/userCalendar.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([GroupEvent, Calendar, User, UserCalendar]),
  ],
  providers: [GroupEventService],
  exports: [GroupEventService]

})
export class GroupEventModule { }
