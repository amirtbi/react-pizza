import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface FecthAddressReturnType {
    address: string;
    position: { latitude: number; longitude: number }
}


import { getAddress } from "../../services/apiGeocoding";
import { AppDispatch } from "../../store";

function getPosition() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}





export const fecthAddress = createAsyncThunk("user/fetchAddress", async function () {
    const positionObj = await getPosition() as { coords: { latitude: number; longitude: number } };
    const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
    };

    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    return { position, address }; // return value of fullfiled in store
})

const initialState = {
    username: "",
    status: "idle",
    position: {},
    address: "",
    error: ""
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateName(state, action) {
            state.username = action.payload;
        },

    },
    extraReducers(builder) {
        builder.addCase(fecthAddress.pending, (state, _) => {
            state.status = "loaidng";
        })
            .addCase(fecthAddress.fulfilled, (state, action) => {
                console.log("action", action)
                state.position = action.payload.position;
                state.address = action.payload.address;
                state.status = "idle";
            })
            .addCase(fecthAddress.rejected, (state, action) => {
                console.log("action", action)
                state.status = "error";
                state.error = action.error.message as string;
            })

    }
});


export const { updateName } = userSlice.actions;

export default userSlice.reducer;
