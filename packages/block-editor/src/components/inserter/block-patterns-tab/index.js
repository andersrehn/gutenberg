/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import PatternsExplorerModal from '../block-patterns-explorer';
import MobileTabNavigation from '../mobile-tab-navigation';
import { PatternCategoryPreviews } from './pattern-category-previews';
import { usePatternCategories } from './use-pattern-categories';
import InserterNoResults from '../no-results';

function BlockPatternsTab( { selectedCategory, onInsert, rootClientId } ) {
	const [ showPatternsExplorer, setShowPatternsExplorer ] = useState( false );

	const categories = usePatternCategories( rootClientId );

	const isMobile = useViewportMatch( 'medium', '<' );

	if ( ! categories.length ) {
		return <InserterNoResults />;
	}

	return (
		<>
			<MobileTabNavigation categories={ categories }>
				{ ( category ) => (
					<div className="block-editor-inserter__category-panel">
						<PatternCategoryPreviews
							key={ category.name }
							onInsert={ onInsert }
							rootClientId={ rootClientId }
							category={ category }
							showTitlesAsTooltip={ false }
						/>
					</div>
				) }
			</MobileTabNavigation>
			{ ! isMobile && (
				<Button
					className="block-editor-inserter__patterns-explore-button"
					onClick={ () => setShowPatternsExplorer( true ) }
					variant="secondary"
				>
					{ __( 'Explore all patterns' ) }
				</Button>
			) }
			{ showPatternsExplorer && (
				<PatternsExplorerModal
					initialCategory={ selectedCategory || categories[ 0 ] }
					patternCategories={ categories }
					onModalClose={ () => setShowPatternsExplorer( false ) }
					rootClientId={ rootClientId }
				/>
			) }
		</>
	);
}

export default BlockPatternsTab;
