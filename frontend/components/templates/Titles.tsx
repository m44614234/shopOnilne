interface Props {
  title: string;
}
const Titles = ({ title }: Props) => {
  return (
    <p className="text-xl font-VazirLight text-end mt-6 mb-2 font-bold text-red-700 items-center">{title}</p>
  );
};
export default Titles;
