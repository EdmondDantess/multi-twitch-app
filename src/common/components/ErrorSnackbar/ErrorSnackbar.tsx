import {useAppDispatch, useAppSelector} from '../../../app/hooks';


export function ErrorSnackbar() {
    const dispatch = useAppDispatch();
    const error = useAppSelector(state => state.userFeedback.error)

    const isOpen = error !== null

    return <div>
        {isOpen &&
            <div style={{position: 'absolute', bottom: 0, left: '10px', backgroundColor: 'red', padding: '10px'}}>
                {error}
            </div>}
    </div>

}