import React, { useState } from 'react';

export default function ConvertNote() {
	//hooks defined
	const [input, setInput] = useState({
		capital_Amount: '',
		annual_Interest_Rate: '',
		monthly_Interest_Rate: '',
		term: '',
		accrued_Interest: '',
		discount_Rate: '',
		valuation_Cap: '',
		pre_Money_Valuation_at_Conversion: '',
		equity_Conversion_Excluding_Interest: '',
		equity_Conversion_Including_Interest: ''
	});

	//handle input change
	const handleChange = (e) => {
		e.preventDefault();

		setInput({
			...input,
			[e.target.name]: e.target.value
		});
		return input;
	};

	//calculation function

	const calculator = (e) => {
		//Monthly Interest Rate
		let sum = Math.pow(1 + input.annual_Interest_Rate / 100, 1 / 12) - 1;
		input.monthly_Interest_Rate = sum * 100;

		//Accrued Interest
		let sum2 =
			input.capital_Amount *
				Math.pow(1 + input.monthly_Interest_Rate / 100, input.term) -
			input.capital_Amount;

		/*
      when monthly interest is rounded to two decimal spaces the result in accrued interes increases. It was put this way because the value of mothly interest would be lesser but take up more space. And since it takes up more space its dificult to manipulate the result to only show two decimal spaces without rounding we manipulated the table output instead.
       */
		input.accrued_Interest = sum2.toFixed(2);

		//Equity Conversion Excluding Interest
		let sum3 =
			input.capital_Amount /
			Math.min(
				input.valuation_Cap,
				input.pre_Money_Valuation_at_Conversion *
					(1 - input.discount_Rate / 100)
			);
		input.equity_Conversion_Excluding_Interest = (sum3 * 100).toFixed(2);

		//Equity Conversion Including Interest
		let sum4 =
			(parseInt(input.capital_Amount) + parseFloat(input.accrued_Interest)) /
			Math.min(
				input.valuation_Cap,
				input.pre_Money_Valuation_at_Conversion *
					(1 - input.discount_Rate / 100)
			);
		input.equity_Conversion_Including_Interest = (sum4 * 100).toFixed(2);

		setInput({
			...input,
			[e.target.name]: e.target.value
		});
	};

	return (
        <div className='bg-lightGrey'>
            <div className="flex justify-start right-20 top-32 p-5 bg-white">
                <table className=" table-auto text-4xl h-full">
                    <thead>
                        <tr className=" text-6xl font-bold text-darkGrey">
                            <td>Convertible Note </td>
                        </tr>
                    </thead>
                    <tbody className=" ">
                        <tr className="   text-white bg-darkGrey">
                            <td>
                                <label>Term </label>
                            </td>
                            <td>
                                <label>Amount </label>
                            </td>
                        </tr>
                        {/*row 1*/}
                        <tr className="text-darkGrey">
                            <td className="">
                                <label>Capital Amount </label>
                            </td>
                            <td>
                                <div className="bg-yellow bg-opacity-50">
                                    <span>$</span>
                                    <input
                                        className=" bg-yellow bg-opacity-10 text-end"
                                        type="string"
                                        name="capital_Amount"
                                        value={input.capital_Amount}
                                        onChange={handleChange}
                                    />
                                </div>
                            </td>
                        </tr>
                        {/*row 2*/}
                        <tr className="text-darkGrey">
                            <td className="">
                                <label>Annual Interest Rate </label>
                            </td>
                            <td>
                                <div className="bg-yellow bg-opacity-50">
                                    <input
                                        className=" bg-yellow bg-opacity-10 text-end"
                                        type="string"
                                        name="annual_Interest_Rate"
                                        value={`${input.annual_Interest_Rate}`}
                                        onChange={handleChange}
                                    />
                                    <span>%</span>
                                </div>
                            </td>
                        </tr>
                        {/*row 3*/}
                        <tr className="text-darkGrey">
                            <td className="">
                                <label>Monthly Interest Rate</label>
                            </td>
                            <td>
                                <div>
                                    <input
                                        className="bg-white text-end"
                                        type="string"
                                        name="monthly_Interest_Rate"
                                        value={`${
                                            input.monthly_Interest_Rate
                                                ? input.monthly_Interest_Rate.toFixed(2)
                                                : 0
                                        }`}
                                        readOnly
                                    />
                                    <span>%</span>
                                </div>
                            </td>
                        </tr>
                        {/*row 4*/}
                        <tr className="text-darkGrey">
                            <td className="">
                                <label>
                                    Term {'('}months to conversion{')'}
                                </label>
                            </td>
                            <td className="bg-yellow bg-opacity-50">
                                <input
                                    className="bg-yellow bg-opacity-10 text-end"
                                    type="string"
                                    name="term"
                                    value={input.term}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        {/*row 5*/}
                        <tr className="text-darkGrey">
                            <td className="">
                                <label>Accrued Interest</label>
                            </td>
                            <td className="">
                                <div>
                                    <span className="bg-white">$</span>
                                    <input
                                        className="bg-white text-end"
                                        type="string"
                                        name="accrued_Interest"
                                        value={input.accrued_Interest}
                                        readOnly
                                    />
                                </div>
                            </td>
                        </tr>
                        {/*row 6*/}
                        <tr className="text-darkGrey">
                            <td className="">
                                <label>Discount Rate </label>
                            </td>
                            <td>
                                <div className="bg-yellow bg-opacity-50">
                                    <input
                                        className="bg-yellow bg-opacity-10 text-end"
                                        type="string"
                                        name="discount_Rate"
                                        value={`${input.discount_Rate}`}
                                        onChange={handleChange}
                                    />
                                    <span>%</span>
                                </div>
                            </td>
                        </tr>
                        {/*row 7*/}
                        <tr className="text-darkGrey">
                            <td className="">
                                <label>Valuation Cap </label>
                            </td>
                            <td>
                                <div className="bg-yellow bg-opacity-50">
                                    <span className="">$</span>
                                    <input
                                        className="bg-yellow bg-opacity-10 text-end"
                                        type="string"
                                        name="valuation_Cap"
                                        value={input.valuation_Cap}
                                        onChange={handleChange}
                                    />
                                </div>
                            </td>
                        </tr>
                        {/*row 8*/}
                        <tr className="text-darkGrey">
                            <td className="">
                                <label>Pre-money Valuation at Conversion </label>
                            </td>
                            <td>
                                <div className="bg-yellow bg-opacity-50">
                                    <span className="">$</span>
                                    <input
                                        className="bg-yellow bg-opacity-10 text-end"
                                        type="string"
                                        name="pre_Money_Valuation_at_Conversion"
                                        value={input.pre_Money_Valuation_at_Conversion}
                                        onChange={handleChange}
                                    />
                                </div>
                            </td>
                        </tr>
                        {/*row 9*/}
                        <tr className="text-darkGrey">
                            <td className="">
                                <label>Equity Conversion Excluding Interest</label>
                            </td>
                            <td className="">
                                <div>
                                    <input
                                        className="bg-white text-end"
                                        type="string"
                                        name="equity_Conversion_Excluding_Interest"
                                        value={`${input.equity_Conversion_Excluding_Interest}%`}
                                        readOnly
                                    />
                                </div>
                            </td>
                        </tr>
                        {/*row 10*/}
                        <tr className="text-darkGrey">
                            <td className="">
                                <label>Equity Conversion Including Interest</label>
                            </td>
                            <td className="">
                                <div>
                                    <input
                                        className="bg-white text-end"
                                        type="string"
                                        name="equity_Conversion_Including_Interest"
                                        value={`${input.equity_Conversion_Including_Interest}%`}
                                        readOnly
                                    />
                                </div>
                            </td>
                        </tr>
						<tr>
							<td>
							<button className="bg-darkGrey text-white px-6 py-2 m-4 text-2xl" onClick={calculator}>Calculate</button>
							</td>
						</tr>
                    </tbody>
                </table>
              
            </div>
        </div>
    );
}
