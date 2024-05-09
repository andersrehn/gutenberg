/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

function StartPageOptionsModal() {
	const { setIsInserterOpened } = useDispatch( editorStore );
	useEffect( () => {
		setIsInserterOpened( { tab: 'patterns', category: 'all' } );
	}, [ setIsInserterOpened ] );
	return null;
}

export default function StartPageOptions() {
	const [ isClosed, setIsClosed ] = useState( false );
	const { shouldEnableModal, postType, postId } = useSelect( ( select ) => {
		const {
			isEditedPostDirty,
			isEditedPostEmpty,
			getCurrentPostType,
			getCurrentPostId,
			getEditorSettings,
		} = select( editorStore );
		const { __unstableIsPreviewMode: isPreviewMode } = getEditorSettings();

		return {
			shouldEnableModal:
				! isPreviewMode && ! isEditedPostDirty() && isEditedPostEmpty(),
			postType: getCurrentPostType(),
			postId: getCurrentPostId(),
		};
	}, [] );

	useEffect( () => {
		// Should reset the modal state when navigating to a new page/post.
		setIsClosed( false );
	}, [ postType, postId ] );

	if ( ! shouldEnableModal || isClosed ) {
		return null;
	}

	return <StartPageOptionsModal onClose={ () => setIsClosed( true ) } />;
}
