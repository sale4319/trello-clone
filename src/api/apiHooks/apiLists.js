import { useContext, useEffect } from 'react';
import _ from 'lodash';
import { useApiResponse } from '../AxiosConfig';
import { AuthContext, BoardContext } from '../../providers/';
import { updateListPosition } from '../apiEndpoints/Lists';

export const useUpdateListPosition = (movedList) => {
    const { isSuccess, isFetching, setIsFetching, setIsSuccess, setError, error } = useApiResponse();
    const { selectedBoard, setSelectedBoard } = useContext(BoardContext);
    const { tokenHolder } = useContext(AuthContext);

    const { listId: id, newPosition: position } = movedList;

    useEffect(() => {
        if (!id || position === 0) return;

        console.log(`calling useUpdateListPosition`);
        setIsFetching(true);
        setIsSuccess(false);
        updateListPosition(id, position, tokenHolder)
            .then(({ data: updatedList }) => {
                const filteredLists = selectedBoard?.lists.filter(list => list.id !== updatedList.id);
                if (selectedBoard) {
                    if (filteredLists) {
                        const newLists = _.sortBy([...filteredLists, updatedList], 'pos');
                        setSelectedBoard({ ...selectedBoard, lists: newLists });
                    } else {
                        setSelectedBoard({ ...selectedBoard, lists: [updatedList] });
                    }
                }
                setIsSuccess(true);
            })
            .catch(({ response }) => setError(response.data))
            .finally(() => setIsFetching(false));
    }, [id, position]);

    return { isSuccess, error, isFetching };
};