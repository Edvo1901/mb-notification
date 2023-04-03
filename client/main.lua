function Notify(title, content, duration, type)
	SendNUIMessage({
		action = 'trigger',
		title = title,
		type = type,
		content = content,
		duration = duration,
	})
end

RegisterNetEvent('mb-notify:client:SendNotify')
AddEventHandler('mb-notify:client:SendNotify', function(title, content, duration, type)
	Notify(title, content, duration, type)
end)