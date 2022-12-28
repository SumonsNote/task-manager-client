import Swal from "sweetalert2";
import { UpdateStatusRequest } from "../APIs/APIs";

export function UpdateDoTo(id, status){
    return Swal.fire({
        title: 'Change Status',
        input: 'select',
        inputOptions: {new: 'new', completed: 'completed', progress: 'progress', canceled: 'canceled'},
        inputValue: 'status'
    }).then((result) => {
        return UpdateStatusRequest(id, result.value).then((res) => {
            return res;
        })
    })
}