import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Form, Input } from 'reactstrap';
import TwoDimensionalImageContext from '../TwoDimensionalImage/twoDimensionalImageContext';
import OptionItem from './OptionItem/OptionItem.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './optionList.scss';

const OptionList = ({
	className,
	annotationName,
	ancestorOptionIds,
	selectedOptionIds,
	level,
}) => {
	const [value, setValue] = useState('');
	const twoDimensionalImageContext = useContext(TwoDimensionalImageContext);
	const {
		entities: { options },
		isDynamicOptionsEnable,
		onOptionCustomizedInputFocus,
		onOptionCustomizedInputBlur,
		onOptionCustomizedFormSubmit,
	} = twoDimensionalImageContext;

	const parentOptionId = ancestorOptionIds[ancestorOptionIds.length - 1];
	const itemListUI = options[parentOptionId].options.map((optionId) => {
		const childrenOptionIds = options[optionId].options;
		return (
			<OptionItem
				level={ level }
				ancestorOptionIds={ [...ancestorOptionIds, optionId] }
				optionId={ optionId }
				childrenOptionIds={ childrenOptionIds }
				annotationName={ annotationName }
				selectedOptionIds={ selectedOptionIds }
			/>
		);
	});

	const customizedOptionUI = isDynamicOptionsEnable ? (
		<ListGroupItem key={ `customized-${parentOptionId}` } style={ { paddingLeft: 30 * level } }>
			<Form inline onSubmit={ (e) => { onOptionCustomizedFormSubmit(e, parentOptionId, value); } }>
				<Input
					className='mr-sm-2'
					type='text'
					name={ parentOptionId }
					value={ value }
					onFocus={ onOptionCustomizedInputFocus }
					onBlur={ onOptionCustomizedInputBlur }
					onChange={ e => setValue(e.target.value) }
				/>
				<Input type='submit' value='Submit' className='my-2 my-sm-0' />
			</Form>
		</ListGroupItem>
	) : null;

	const rootClassName = `option-list${className ? ` ${className}` : ''}`;
	return (
		<ListGroup className={ rootClassName }>
			{ itemListUI }
			{ customizedOptionUI }
		</ListGroup>
	);
};

OptionList.propTypes = {
	className: PropTypes.string,
	annotationName: PropTypes.string,
	level: PropTypes.number,
	ancestorOptionIds: PropTypes.arrayOf(PropTypes.string),
	selectedOptionIds: PropTypes.arrayOf(PropTypes.string),
};
OptionList.defaultProps = {
	className: '',
	annotationName: '',
	level: 1,
	ancestorOptionIds: [],
	selectedOptionIds: [],
};
export default OptionList;
