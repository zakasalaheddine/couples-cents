interface DisplayCategoryProps {
  icon: string
  name: string
}

export default function DisplayCategory({ icon, name }: DisplayCategoryProps) {
  return (
    <div className="flex items-center gap-2">
      <span role="img">{icon}</span>
      <span>{name}</span>
    </div>
  )
}
