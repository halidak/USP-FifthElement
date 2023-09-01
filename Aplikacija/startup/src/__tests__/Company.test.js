import {render, screen, waitFor } from "@testing-library/react";
import AvailableCompanies from '../components/companies/AvailableCompanies'
import axiosMock from "axios";

it('fetching avaliable comapnies', async() => {
    axiosMock.get.mockResolvedValueOnce({list: {id: 1, companyName: 'Microsoft', photo: "https://example.com"}})
    const {queryByTestId} = render(<AvailableCompanies />);

    await waitFor(() =>
     expect(queryByTestId('resolved')).toBeDefined()
    )
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
 })