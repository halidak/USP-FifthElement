import {render, screen } from "@testing-library/react";
import NoticeItem from "../components/notices/NoticeItem";

describe('Notice component', () => {
   test('notice item is rendering', () => {
    const props = {name: "a", companyName: "b", date: "1", location: "a", companyPhoto: "a", id: 1}
    render(<NoticeItem props={props} />)
    const nameEl = screen.getByTestId('notice-name');
    expect(nameEl).toBeDefined();
   })
})
