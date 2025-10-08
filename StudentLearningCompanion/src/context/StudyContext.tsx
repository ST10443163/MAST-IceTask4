//Provides global app state using React Context API
//Stores study sessions, subjects and settings persistently in AsyncStorage
import React from "react";
import { AppState } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reducer } from "./reducer";

//Key for local storage
const STORAGE_KEY = 'STUDY'