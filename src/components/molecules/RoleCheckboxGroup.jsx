import React from "react"
import Checkbox from "@/components/atoms/Checkbox"

const RoleCheckboxGroup = ({ selectedRoles, onChange }) => {
  const roles = [
    { value: "free", label: "무료" },
    { value: "member", label: "멤버" },
    { value: "master", label: "마스터" },
    { value: "both", label: "통합" },
  ]

  const handleChange = (roleValue, checked) => {
    if (checked) {
      onChange([...selectedRoles, roleValue])
    } else {
      onChange(selectedRoles.filter(r => r !== roleValue))
    }
  }

  return (
    <div className="space-y-3">
      <label className="form-label">접근 권한</label>
      <div className="grid grid-cols-2 gap-4">
        {roles.map((role) => (
          <label key={role.value} className="flex items-center gap-3 cursor-pointer">
            <Checkbox
              checked={selectedRoles.includes(role.value)}
              onChange={(e) => handleChange(role.value, e.target.checked)}
            />
            <span className="text-sm font-medium text-gray-700">{role.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default RoleCheckboxGroup