import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import './errorFeedback.css';
import { useEffect } from 'react';
import { setError } from '../../../app/userFeedback-reducer';

export const ErrorSnackbar = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.userFeedback.error);

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                dispatch(setError(null));
            }, 6000);
        }
    }, [dispatch, error]);

    return <>{error && <div className={'error_feedback'}>{error}</div>}</>;
};
