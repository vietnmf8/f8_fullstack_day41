import { useProvinces, actions } from "@/features/address";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProvinces } from "./service";

export function useFetchProvinces() {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const data = useProvinces();

    useEffect(() => {
        (async () => {
            const response = await getProvinces();
            dispatch(actions.setProvinces(response.data));
            setIsLoading(false);
        })();
    }, [dispatch, setIsLoading]);

    return { isLoading, data };
}
