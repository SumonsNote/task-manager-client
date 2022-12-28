import { configureStore } from "@reduxjs/toolkit";
import SettingReducer from "../state/SettingSlice";
import taskReucer from '../state/TaskSlice'
import summaryReucer from '../state/SummarySlice'
import profileReducer from '../state/ProfileSlice'
export default configureStore({
    reducer: {
        settings: SettingReducer,
        task: taskReucer,
        summary: summaryReucer,
        profile: profileReducer
    }
})