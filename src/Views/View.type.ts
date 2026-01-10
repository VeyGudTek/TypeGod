export interface View{
    Children: View[],
    Render: () => void,
}